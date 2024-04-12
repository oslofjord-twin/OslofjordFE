export function findAverage (arr : number []) {
    const average = arr.reduce((a, b) => a + b, 0) / arr.length;
    return average
}
  
export function temperatureArray (arr: [][], hours : number) {
    arr.length < hours ? arr : arr = arr.slice(1).slice(-hours)
    const onlyTemperatures : number[] = []
    arr.forEach((obj : any) => {
        if (obj.temperature !== "NaN") {
        onlyTemperatures.push(obj.temperature)
        }
      }
    )
    let returnValue
    onlyTemperatures.length === 0 ? returnValue = null : returnValue = onlyTemperatures
    return returnValue
}
  
export function conductivityArray (arr: [][], hours : number) {
    arr.length < hours ? arr : arr = arr.slice(1).slice(-hours)
    const onlyConductivity : number[] = []
    arr.forEach((obj : any) => {
        if (obj.conductivity !== "NaN") {
          onlyConductivity.push(obj.conductivity)
        }
      }
    )
    let returnValue
    onlyConductivity.length === 0 ? returnValue = null : returnValue = onlyConductivity
    return returnValue
}
  
export function turbidityArray (arr: [][], hours : number) {
    arr.length < hours ? arr : arr = arr.slice(1).slice(-hours)
    const onlyTurbidity : number[] = []
    arr.forEach((obj : any) => {
      if (obj.turbidity !== "NaN")
        onlyTurbidity.push(obj.turbidity)
      }
    )
    let returnValue
    onlyTurbidity.length === 0 ? returnValue = null : returnValue = onlyTurbidity
    return returnValue
}