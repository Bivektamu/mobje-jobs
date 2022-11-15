import axios from 'axios'



 export const addUser = async (formFields) => {



    const headers = {
            'Content-Type': 'application/json'
    }
    try {

        const res = await axios.post(
            '/api/user/add',
            formFields,
            headers
        )


        if(res) {
            console.log('asdf')
            return res
        }


    } catch (error) {
        console.log(error.response.data.error)
        return (error.response.data)
    }



    return 'field recieved'

}