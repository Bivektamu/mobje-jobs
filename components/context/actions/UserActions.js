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
            return res.data
        }
        else {
            return {'message': 'Error'}

        }


    } catch (error) {
        console.log(error.messages)
    }



    return 'field recieved'

}