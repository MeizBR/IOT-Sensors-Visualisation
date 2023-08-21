//change your CO2 parameters here
/*if you need to add another gaz you should make
a page like this and then go to HeatMapchart function and
just add a new else if with needed parameters*/

enum CO2 {
    LowStart = 0,
    GoodStart = 800,
    ModerateStart = 1000,
    HighStart = 2000,
   
    LowEnd = 800,
    GoodEnd = 1000,
    ModerateEnd = 2000,
    HighEnd = 5000,
    HazardousStart = 5000, 
    HazardousEnd = Infinity,
  }
export default CO2