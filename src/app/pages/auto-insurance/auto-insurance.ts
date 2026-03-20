import { Component } from '@angular/core';

@Component({
  selector: 'app-auto-insurance',
  standalone: false,
  templateUrl: './auto-insurance.html',
  styleUrl: './auto-insurance.scss',
})
export class AutoInsurance {
  chips = [
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.PERSONAL_CAR', icon: 'fas fa-car' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.COMMERCIAL_AUTO', icon: 'fas fa-house' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.RIDESHARE', icon: 'fas fa-building' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.SR22', icon: 'fas fa-heart' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.RV_MOTORHOME', icon: 'fas fa-notes-medical' },
    { name: 'AUTO_INSURANCE.BANNER.CHIPS.OTHER', icon: 'fas fa-file-contract' },
  ];

  rates = [
    { city: 'Houston', monthly: '$265', annual: '$3,153' },
    { city: 'San Antonio', monthly: '$232', annual: '$2,782' },
    { city: 'Dallas', monthly: '$262', annual: '$3,146' },
    { city: 'Austin', monthly: '$218', annual: '$2,616' },
    { city: 'Fort Worth', monthly: '$229', annual: '$2,750' },
    { city: 'El Paso', monthly: '$220', annual: '$2,646' },
    { city: 'Arlington', monthly: '$237', annual: '$2,839' },
    { city: 'Corpus Christi', monthly: '$221', annual: '$2,657' },
    { city: 'Plano', monthly: '$224', annual: '$2,688' },
    { city: 'Lubbock', monthly: '$216', annual: '$2,592' },
  ];

  companyRates = [
    { company: 'State Farm', liability: '$57', full: '$201' },
    { company: 'Progressive', liability: '$80', full: '$241' },
    { company: 'Allstate', liability: '$81', full: '$243' },
    { company: 'Mile Auto', liability: '$74', full: '$157' },
    { company: 'Mercury', liability: '$102', full: '$171' },
    { company: 'USAA', liability: '$102', full: '$180' },
    { company: 'GEICO', liability: '$95', full: '$181' },
    { company: 'Root', liability: '$121', full: '$209' },
    { company: 'Safeco', liability: '$141', full: '$216' },
    { company: 'Clearcover', liability: '$125', full: '$251' },
    { company: 'Direct Auto', liability: '$146', full: '$224' },
    { company: 'Nationwide', liability: '$119', full: '$227' },
    { company: 'Amica', liability: '$118', full: '$235' },
    { company: 'Elephant', liability: '$150', full: '$236' },
    { company: 'The General', liability: '$125', full: '$239' },
    { company: 'National General', liability: '$146', full: '$243' },
    { company: 'Bristol West', liability: '$135', full: '$250' },
    { company: 'GAINSCO', liability: '$127', full: '$134' },
    { company: 'Mendota', liability: '$136', full: '$257' },
    { company: 'Sun Coast', liability: '$138', full: '$261' },
    { company: 'AssuranceAmerica', liability: '$135', full: '$275' },
    { company: 'First Acceptance', liability: '$121', full: '$209' },
    { company: 'Loop', liability: '$147', full: '$277' },
    { company: 'Commonwealth Casualty', liability: '$132', full: '$288' },
    { company: 'Lone Star', liability: '$137', full: '$291' },
    { company: 'Covercube', liability: '$127', full: '$300' },
    { company: 'Chubb', liability: '$176', full: '$306' },
    { company: 'Freedom National', liability: '$121', full: '$314' },
    { company: 'Texas One', liability: '$156', full: '$357' },
    { company: 'Dairyland', liability: '$130', full: '$338' },
    { company: 'Liberty Mutual', liability: '$112', full: '$341' },
    { company: '21st Century', liability: '$101', full: '$354' },
  ];

  cheapestVehicles = [
    { make: 'Honda', price: '$161' },
    { make: 'Acura', price: '$167' },
    { make: 'Subaru', price: '$168' },
    { make: 'Hyundai', price: '$180' },
    { make: 'Ford', price: '$185' },
    { make: 'Toyota', price: '$185' },
  ];

  expensiveVehicles = [
    { make: 'Maserati', price: '$411' },
    { make: 'Lotus', price: '$444' },
    { make: 'Lamborghini', price: '$502' },
    { make: 'Aston Martin', price: '$548' },
    { make: 'Ferrari', price: '$913' },
  ];

  driverRates = [
    { profile: 'Clean Record', quote: '$178', comparison: 'Baseline' },
    { profile: 'With Accident', quote: '$246', comparison: '+38%' },
    { profile: 'With Speeding Ticket', quote: '$236', comparison: '+33%' },
    { profile: 'With DUI', quote: '$282', comparison: '+58%' },
  ];

  coverageComparison = [
    { feature: 'Meets Texas legal requirements', min: '✓ Yes', full: '✓ Yes' },
    { feature: 'Covers your car repairs', min: '✗ No', full: '✓ Yes' },
    { feature: 'Covers weather damage', min: '✗ No', full: '✓ Yes' },
    { feature: 'Covers theft & vandalism', min: '✗ No', full: '✓ Yes' },
    { feature: 'Covers your medical bills', min: '✗ No', full: '— With PIP/MedPay' },
    { feature: 'Required by lenders', min: '✗ No', full: '✓ Yes' },
    { feature: 'Monthly cost', min: '$ Lower', full: '$$ Higher' },
  ];

  impactFactors = [
    { title: 'Driving Record', description: "Your past driving violations or accidents can increase your premium, as you're considered a higher risk.", icon: 'fas fa-car-side' },
    { title: 'Insurance History / Coverage Lapses', description: 'A history of continuous coverage can secure you affordable vehicle insurance, while gaps may increase your premium.', icon: 'fas fa-file-invoice-dollar' },
    { title: 'Credit-Based Insurance Score', description: 'Your credit score can impact your auto insurance rates, as insurers often offer cheaper rates to those with good credit.', icon: 'fas fa-credit-card' },
    { title: 'Claims History', description: 'A history of accidents or claims can lead to higher premiums for auto insurance, as insurers view you as a higher risk.', icon: 'fas fa-history' },
    { title: 'Location & ZIP Code', description: 'Your location and ZIP code affect your auto insurance premium, with urban areas like Houston having higher rates.', icon: 'fas fa-map-marker-alt' },
    { title: 'Coverage Level & Deductible', description: "Opting for a higher deductible can reduce your premium, but that means you'll pay more out-of-pocket.", icon: 'fas fa-shield-alt' },
    { title: 'Age & Years of Driving Experience', description: 'Young drivers or those with limited driving experience may face higher auto insurance rates.', icon: 'fas fa-user-clock' },
    { title: 'Multi-Vehicle Household', description: 'If you have multiple vehicles in your household, you may qualify for discounts by bundling your policies together.', icon: 'fas fa-car' },
    { title: 'Gender', description: 'Gender can affect auto insurance costs, with some insurers offering lower rates to male drivers.', icon: 'fas fa-venus-mars' },
    { title: 'Vehicle Use (Personal vs. Commercial)', description: "If you use your vehicle for commercial purposes, such as ridesharing, you'll need a commercial auto insurance policy.", icon: 'fas fa-truck' },
    { title: 'Marital Status', description: 'Married drivers may qualify for lower vehicle insurance rates, as insurers consider them less risky.', icon: 'fas fa-users' },
    { title: 'Garaging Address', description: 'The location of garages influences your vehicle insurance rates, as areas with higher theft rates may raise premiums.', icon: 'fas fa-home' },
    { title: 'Vehicle Make & Model', description: 'The make and model of your car can affect your insurance rate, with sports cars or luxury vehicles costing more to insure.', icon: 'fas fa-car-rear' },
    { title: 'Anti-Theft & Safety Features', description: 'Vehicles with anti-theft or advanced safety features often qualify for lower insurance rates.', icon: 'fas fa-user-shield' },
    { title: 'Vehicle Age & Condition', description: 'Older vehicles or those in poor condition may have higher insurance premiums due to higher repair costs and greater risk.', icon: 'fas fa-wrench' },
    { title: 'SR-22 Filing Requirement', description: "If you need SR-22 insurance, you'll likely face higher premiums, as it indicates a higher-risk driving history.", icon: 'fas fa-file-signature' },
    { title: 'Annual Mileage', description: 'Drivers who use their vehicles less frequently may find cheaper auto insurance, as lower mileage means fewer accidents.', icon: 'fas fa-tachometer-alt' },
  ];

  discountFactors = [
    { title: 'Bundling Discount (Auto + Home)', description: 'Bundle your auto and home insurance and receive a discount for combining both policies under one plan.', icon: 'fas fa-house-user' },
    { title: 'Vehicle Safety Features Discount', description: 'Vehicles with advanced safety features, such as airbags or anti-lock brakes, may qualify for a discount on auto insurance.', icon: 'fas fa-shield-alt' },
    { title: 'Multi-Car Discount', description: 'Insure multiple vehicles under one policy to qualify for a multi-car discount.', icon: 'fas fa-cars' },
    { title: 'Homeowner Discount', description: 'Homeowners may qualify for a discount on their auto insurance premiums when they bundle their auto and home policies.', icon: 'fas fa-home' },
    { title: 'Safe Driver / Accident-Free Discount', description: 'Maintain a clean driving record to qualify for a discount on your auto insurance premium for being accident-free.', icon: 'fas fa-user-shield' },
    { title: 'Vehicle Use (Personal vs. Commercial)', description: 'If you use your vehicle for commercial purposes, such as ridesharing, you\'ll need a commercial auto insurance policy.', icon: 'fas fa-truck' },
    { title: 'Good Student Discount', description: 'Students with good academic standing can qualify for a discount on auto insurance by providing proof of their academic performance.', icon: 'fas fa-user-graduate' },
    { title: 'Military or Occupational Discount', description: 'Military personnel or certain professionals can receive a discount on auto insurance premiums.', icon: 'fas fa-medal' },
    { title: 'Defensive Driving Course Discount', description: 'Complete a defensive driving course and earn a discount on your auto insurance premium for improved driving skills.', icon: 'fas fa-graduation-cap' },
    { title: 'Student Away at School Discount', description: 'Students living away at school can save on auto insurance because they don\'t use their car as often.', icon: 'fas fa-bus' },
    { title: 'Telematics / Usage-Based Insurance Discount', description: 'Sign up for usage-based insurance, where your premium depends on driving habits, potentially lowering costs.', icon: 'fas fa-satellite-dish' },
    { title: 'Loyalty / Renewal Discount', description: 'Long-term customers can save on their auto insurance premiums with a loyalty or renewal discount when they renew their policy.', icon: 'fas fa-handshake' },
    { title: 'Paid-in-Full Discount', description: 'Pay your entire auto insurance premium upfront to qualify for a paid-in-full discount and avoid installment fees.', icon: 'fas fa-money-bill-wave' },
    { title: 'Low Mileage Discount', description: 'If you drive fewer miles, you may qualify for a low mileage discount on your auto insurance, as fewer miles mean fewer risks.', icon: 'fas fa-tachometer-alt' },
    { title: 'Automatic Payment / EFT Discount', description: 'Set up automatic payments for your auto insurance policy to receive a premium discount.', icon: 'fas fa-credit-card' },
    { title: 'Early Signing Discount', description: 'Signing up for auto insurance early can help you save money with an early signing discount on your premium.', icon: 'fas fa-pen-nib' },
    { title: 'Paperless Billing Discount', description: 'Opt for paperless billing for your auto insurance to save on administrative costs.', icon: 'fas fa-file-pdf' },
    { title: 'Senior Driver Discount', description: 'Senior drivers may receive a discount on their auto insurance premiums for their extensive driving experience.', icon: 'fas fa-user-friends' },
    { title: 'Anti-Theft Device Discount', description: 'Install an anti-theft device in your vehicle to receive a discount on your auto insurance premium for added security.', icon: 'fas fa-lock' },
    { title: 'Good Credit Discount', description: 'Drivers with a good credit score can benefit from a good credit discount on their auto insurance, lowering their premiums.', icon: 'fas fa-chart-line' },
    { title: 'New Vehicle Discount', description: 'If you own a new vehicle, you may qualify for a discount on your auto insurance, which can lower your premium.', icon: 'fas fa-car' },
  ];

  agentComparisonData = [
    { feature: 'Number of Insurance Companies', independent: '10+ insurance carriers', captive: 'Only one company' },
    { feature: 'Ability to Compare Rates', independent: 'Yes', captive: 'No' },
    { feature: 'Flexibility if Rates Increase', independent: 'Can re-shop your policy', captive: 'Limited' },
    { feature: 'Goal', independent: 'Represents the client', captive: 'Represents the insurer' },
    { feature: 'Claims Assistance', independent: 'Advocacy for the customer', captive: 'Limited support' },
    { feature: 'Language Support', independent: 'English, Spanish, and Hindi', captive: 'Often limited' },
  ];

  vehicleInsuranceTypes = [
    { title: 'Car Insurance', description: 'Find affordable auto insurance for everyday drivers. Compare multiple carriers to secure the best coverage and competitive rates for your vehicle.', icon: 'fas fa-car' },
    { title: 'Motorcycle Insurance', description: 'Protect your bike with flexible motorcycle coverage. We help riders compare options to find cheap vehicle insurance without sacrificing protection.', icon: 'fas fa-motorcycle' },
    { title: 'Boat Insurance', description: 'Keep your boat protected on lakes and coastal waters with reliable coverage that protects against accidents, theft, and unexpected damage.', icon: 'fas fa-ship' },
    { title: 'RV & Motorhome Insurance', description: 'Enjoy the open road with RV and motorhome insurance designed for travelers. Get reliable protection whether you use your RV occasionally or full-time.', icon: 'fas fa-bus' },
    { title: 'Classic Car Insurance', description: 'Protect your prized classic with specialized policies designed for collectible vehicles, ensuring proper value protection and tailored coverage.', icon: 'fas fa-car-side' },
    { title: 'Commercial Auto Insurance', description: 'Businesses can secure dependable commercial auto insurance for company vehicles, protecting drivers, cargo, and operations on the road.', icon: 'fas fa-truck' },
    { title: 'SR-22 Insurance', description: 'Need SR-22 insurance after a license suspension or violation? We help high-risk drivers find affordable coverage and get back on the road legally.', icon: 'fas fa-file-invoice' },
    { title: 'ATV & UTV Insurance', description: 'Ride confidently with ATV and UTV coverage that protects against accidents, theft, and liability while exploring trails.', icon: 'fas fa-motorcycle' },
    { title: 'Mexican Car Insurance', description: 'Planning to drive into Mexico? Mexican auto insurance provides the required liability protection so you can travel confidently across the border.', icon: 'fas fa-car' },
    { title: 'Rideshare Insurance', description: 'Drive for Uber or Lyft? Rideshare insurance fills coverage gaps between personal & commercial policies, keeping drivers protected while working.', icon: 'fas fa-user-friends' },
    { title: 'Trailer Insurance', description: 'Safeguard your trailer with coverage that protects against damage, theft, and liability while towing equipment, boats, or recreational vehicles.', icon: 'fas fa-trailer' },
  ];

}
