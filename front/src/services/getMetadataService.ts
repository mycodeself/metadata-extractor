import Metadata from "../model/Metadata";

export default function(file: File): Promise<Metadata[]> {
    return new Promise((resolve, reject) => {
        const route = 'http://localhost:4000/metadata';
        const formData = new FormData();
        formData.append('file', file);
    
        const options: RequestInit = {
            method: 'POST',
            body: formData,
            mode: 'cors'
        };
    
        fetch(route, options)
        .then((response: Response) => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
        
            return response.json();
        })
        .catch(error => reject(error))
        .then(response => {
            resolve(response);
        });        
    })
}