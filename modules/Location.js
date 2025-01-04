class Location {
    static getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // metres
        const p1 = lat1 * Math.PI / 180; // p, l in radians
        const p2 = lat2 * Math.PI / 180;
        const dp = (lat2 - lat1) * Math.PI / 180;
        const dl = (lon2 - lon1) * Math.PI / 180;
        
        const a = Math.sin(dp/2) * Math.sin(dp/2) +
                  Math.cos(p1) * Math.cos(p2) *
                  Math.sin(dl/2) * Math.sin(dl/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        return R * c; // in metres
    }
}

module.exports = Location;