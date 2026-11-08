import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';

/** NHTSA vPIC (free, public, no key, CORS open): https://vpic.nhtsa.dot.gov/api/ */
const API = 'https://vpic.nhtsa.dot.gov/api/vehicles';

export interface VehicleMake {
  id: number;
  name: string;
}

/**
 * The makes shown first in the Make dropdown, with their NHTSA make IDs (from GetAllMakes),
 * so models load without downloading the full make list.
 */
export const POPULAR_MAKES: VehicleMake[] = [
  { id: 475, name: 'Acura' }, { id: 582, name: 'Audi' }, { id: 452, name: 'BMW' }, { id: 468, name: 'Buick' },
  { id: 469, name: 'Cadillac' }, { id: 467, name: 'Chevrolet' }, { id: 477, name: 'Chrysler' }, { id: 476, name: 'Dodge' },
  { id: 460, name: 'Ford' }, { id: 472, name: 'GMC' }, { id: 474, name: 'Honda' }, { id: 498, name: 'Hyundai' },
  { id: 480, name: 'Infiniti' }, { id: 483, name: 'Jeep' }, { id: 499, name: 'Kia' }, { id: 515, name: 'Lexus' },
  { id: 464, name: 'Lincoln' }, { id: 473, name: 'Mazda' }, { id: 449, name: 'Mercedes-Benz' }, { id: 481, name: 'Mitsubishi' },
  { id: 478, name: 'Nissan' }, { id: 496, name: 'Ram' }, { id: 523, name: 'Subaru' }, { id: 441, name: 'Tesla' },
  { id: 448, name: 'Toyota' }, { id: 482, name: 'Volkswagen' }, { id: 485, name: 'Volvo' },
];

/**
 * Vehicle makes and models for the auto quote form. Browser only (the server gets empty lists).
 * Results are kept in memory for the page's life; the full make list (~12,400 makes, ~600 kB) is only
 * downloaded when the visitor picks "Other make".
 */
@Injectable({ providedIn: 'root' })
export class VehicleDataService {
  private readonly isBrowser: boolean;
  private allMakes?: Promise<VehicleMake[]>;
  private readonly models = new Map<string, Promise<string[]>>();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /** Every make NHTSA knows (GetAllMakes), A–Z. Empty on failure, so the form falls back to typing. */
  getAllMakes(): Promise<VehicleMake[]> {
    if (!this.isBrowser) return Promise.resolve([]);
    if (!this.allMakes) {
      this.allMakes = firstValueFrom(
        this.http.get<{ Results: { Make_ID: number; Make_Name: string }[] }>(`${API}/GetAllMakes?format=json`),
      )
        .then((r) =>
          (r.Results || [])
            .map((m) => ({ id: m.Make_ID, name: (m.Make_Name || '').trim() }))
            .filter((m) => m.name)
            .sort((a, b) => a.name.localeCompare(b.name)),
        )
        .catch(() => {
          this.allMakes = undefined; // try again next time
          return [];
        });
    }
    return this.allMakes;
  }

  /**
   * Model names for a make, A–Z, without duplicates. With a model year (1990 and later) only that year's
   * models are returned (GetModelsForMakeIdYear); otherwise every model of the make (GetModelsForMakeId).
   * Empty on failure, so the form falls back to typing.
   */
  getModels(makeId: number, year?: string): Promise<string[]> {
    if (!this.isBrowser || !makeId) return Promise.resolve([]);
    const y = year && /^\d{4}$/.test(year) && Number(year) >= 1990 ? year : '';
    const key = `${makeId}:${y}`;
    let hit = this.models.get(key);
    if (!hit) {
      const url = y
        ? `${API}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${y}?format=json`
        : `${API}/GetModelsForMakeId/${makeId}?format=json`;
      hit = firstValueFrom(this.http.get<{ Results: { Model_Name: string }[] }>(url))
        .then((r) => {
          const names = (r.Results || []).map((m) => (m.Model_Name || '').trim()).filter(Boolean);
          return [...new Set(names)].sort((a, b) => a.localeCompare(b));
        })
        .catch(() => {
          this.models.delete(key);
          return [];
        });
      this.models.set(key, hit);
    }
    return hit;
  }
}
