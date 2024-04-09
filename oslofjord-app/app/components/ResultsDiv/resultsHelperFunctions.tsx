export function findAverage (arr : number []) {
    const average = arr.reduce((a, b) => a + b, 0) / arr.length;
    return average
  }
  
export function temperatureArray (arr: [][], hours : number) {
    arr.length < hours ? arr : arr = arr.slice(1).slice(-hours)
    const onlyTemperatures : number[] = []
    arr.forEach((obj : any) => {
        onlyTemperatures.push(obj.temperature)
      }
    )
    return findAverage(onlyTemperatures)
}
  
  
export function conductivityArray (arr: [][], hours : number) {
    arr.length < hours ? arr : arr = arr.slice(1).slice(-hours)
    const onlyConductivity : number[] = []
    arr.forEach((obj : any) => {
        onlyConductivity.push(obj.conductivity)
      }
    )
    return findAverage(onlyConductivity)
}
  
export function turbidityArray (arr: [][], hours : number) {
    arr.length < hours ? arr : arr = arr.slice(1).slice(-hours)
    const onlyTurbidity : number[] = []
    arr.forEach((obj : any) => {
        onlyTurbidity.push(obj.turbidity)
      }
    )
    return findAverage(onlyTurbidity)
}