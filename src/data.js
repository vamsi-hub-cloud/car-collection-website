// id, brand, name, category, price(USD), year, hp, 0-60s, top mph, engine, transmission, drivetrain, fuel, color, body, blurb
const T=[
['revuelto','Lamborghini','Revuelto','Supercar',608000,2025,1001,2.5,217,'6.5L V12 + 3 e-motors','8-speed DCT','AWD','Hybrid','#E8A317','coupe','The first V12 plug-in hybrid supercar from Sant\u2019Agata, built around a carbon monocoque.'],
['296gtb','Ferrari','296 GTB','Supercar',322000,2024,819,2.9,205,'3.0L V6 + e-motor','8-speed DCT','RWD','Hybrid','#C1121F','coupe','Ferrari\u2019s small-displacement V6 hybrid with a razor-sharp chassis and 15 miles of silent range.'],
['750s','McLaren','750S','Supercar',324000,2024,740,2.7,206,'4.0L twin-turbo V8','7-speed DCT','RWD','Petrol','#FF6B00','coupe','Lighter, faster and more connected than its predecessor, with a hydraulic-feel steering rack.'],
['911gt3','Porsche','911 GT3','Sports',223000,2024,502,3.2,198,'4.0L flat-six','7-speed PDK','RWD','Petrol','#3B82F6','coupe','A naturally aspirated flat-six that revs to 9,000 rpm, tuned for the road and the track.'],
['db12','Aston Martin','DB12','Sports',248000,2024,671,3.5,202,'4.0L twin-turbo V8','8-speed auto','RWD','Petrol','#6F8FB0','coupe','A super tourer that blends hand-built craft with serious pace and a calm, long-legged ride.'],
['amggt63','Mercedes-AMG','GT 63','Sports',191000,2024,577,3.1,196,'4.0L twin-turbo V8','9-speed MCT','AWD','Petrol','#A7ADB4','coupe','Four doors, four-wheel drive and a hand-built AMG V8 \u2014 a grand tourer for the whole family.'],
['contgt','Bentley','Continental GT Speed','Luxury',335000,2024,771,3.2,208,'4.0L V8 + e-motor','8-speed DCT','AWD','Hybrid','#3B3B5C','coupe','The grand tourer perfected: quilted leather, knurled metal and torque that never runs out.'],
['spectre','Rolls-Royce','Spectre','Luxury',420000,2025,577,4.4,155,'Dual electric motors','Single speed','AWD','Electric','#D9D4C7','coupe','A silent, coachbuilt electric coupe with a starlit headliner and a ride like a magic carpet.'],
['s680','Mercedes-Maybach','S 680','Luxury',230000,2024,621,4.4,155,'6.0L twin-turbo V12','9-speed auto','AWD','Petrol','#22222C','sedan','A rear-seat first-class cabin with executive recline, champagne flutes and a V12 hush.'],
['urus','Lamborghini','Urus SE','SUV',258000,2025,789,3.4,190,'4.0L V8 + e-motor','8-speed auto','AWD','Hybrid','#8B5CF6','suv','The super SUV, now plug-in hybrid, with rear-axle steering and a launch like a supercar.'],
['bentayga','Bentley','Bentayga EWB','SUV',232000,2024,542,4.0,180,'4.0L twin-turbo V8','8-speed auto','AWD','Petrol','#1F7A66','suv','Lounge-like rear seats, an extended wheelbase and effortless off-road ability.'],
['rrsv','Land Rover','Range Rover SV','SUV',220000,2024,606,3.8,180,'4.4L twin-turbo V8','8-speed auto','AWD','Petrol','#56606E','suv','The benchmark luxury SUV, tailored by SV with bespoke materials and a commanding view.'],
['plaid','Tesla','Model S Plaid','Electric',90000,2024,1020,2.0,200,'Tri-motor electric','Single speed','AWD','Electric','#D4D4D8','sedan','Over 1,000 hp and sub-two-second sprints, with a minimalist cabin and a huge charging network.'],
['taycan','Porsche','Taycan Turbo S','Electric',207000,2024,938,2.3,161,'Dual electric motors','2-speed auto','AWD','Electric','#0EA5E9','sedan','An 800-volt electric sports saloon that still feels like a Porsche when the road bends.']]
export const cars=T.map(([id,brand,name,category,price,year,hp,zero,top,engine,trans,drive,fuel,color,body,blurb])=>({id,brand,name,category,price,year,hp,zero,top,engine,trans,drive,fuel,color,body,blurb,full:`${brand} ${name}`}))
export const categories=[...new Set(cars.map(c=>c.category))]
export const brands=[...new Set(cars.map(c=>c.brand))]
export const brandInfo={Lamborghini:['Italy',1963],Ferrari:['Italy',1947],McLaren:['United Kingdom',1963],Porsche:['Germany',1931],'Aston Martin':['United Kingdom',1913],'Mercedes-AMG':['Germany',1967],Bentley:['United Kingdom',1919],'Rolls-Royce':['United Kingdom',1904],'Mercedes-Maybach':['Germany',1909],'Land Rover':['United Kingdom',1948],Tesla:['United States',2003]}
export const catInfo={Supercar:'Mid-engine machines built for records.',Sports:'Precision coupes for road and circuit.',Luxury:'Hand-finished grand tourers and limousines.',SUV:'Power and presence with room for five.',Electric:'Silent, instant, relentless torque.'}
export const money=n=>'$'+n.toLocaleString('en-US')
export const faqs=[
['How do I book a test drive?','Open any car, choose Book test drive, pick a date and time slot, and send the form. A specialist confirms by email within one business day.'],
['Can I compare cars side by side?','Yes. Tap Compare on up to three cars, then open the Compare page to see price, power, speed and drivetrain together, with the best value in each row highlighted.'],
['Are the listed prices final?','Prices are starting prices and exclude taxes, delivery and options. Send an enquiry for a personalised quote.'],
['Do you accept trade-ins and offer financing?','Yes. Mention your current car and preferred finance term in the enquiry form and we will prepare an offer.'],
['Can I order a car in a custom specification?','Most brands in our collection offer bespoke colours, materials and trim. Our advisors guide you through the configurator.'],
['Is delivery available worldwide?','We arrange insured, enclosed delivery to most countries. Timelines depend on the destination and import rules.']]
