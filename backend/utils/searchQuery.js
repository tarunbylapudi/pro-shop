
// dont format this file
const searchQuery=(keyword)=>{
    return {
        '$or': [
          {
            'name': {
              '$regex': `${keyword}`, 
              '$options': 'i'
            }
          }, {
            'description': {
              '$regex': `${keyword}`, 
              '$options': 'i'
            }
          }, {
            'category': {
              '$regex': `${keyword}`, 
              '$options': 'i'
            }
          }, {
            'brand': {
              '$regex': `${keyword}`, 
              '$options': 'i'
            }
          }
        ]
      }
}

export default searchQuery;