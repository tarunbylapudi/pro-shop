const useLocation = () => {
    return navigator.geolocation.getCurrentPosition((location) => { console.log(location.coords.latitude, "latitude"); console.log(location.coords.longitude, "longitude") }, (err) => { console.log(err) })
}
export default useLocation