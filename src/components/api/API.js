
export default class API 
{
  
    static async fetch (query, variables = {}) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({query: query, variables: variables}),
        };
        
        try {
            let res = await fetch('https://amaranth-elly-6.tiiny.io/', options)
            res = await res.json()
            console.log(res);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }
}
