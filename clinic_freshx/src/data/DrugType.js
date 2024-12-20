import axios from '../services/axiosInstance';

const CURDDrugType = () => {
    const getDrugType = async() =>{
        try{
            const res = await axios.get('/api/drugtype');
            return res;
        }
        catch(error){
            console.error(error)
        }
    }
    const getDrugTypeById = async () => {
        try {
            const res = await axios.get('File/GetAllFilesInBlob');
            console.log(res);
            return res;
          
        } catch (error) {
            console.error(error);
        }
    }

    const postDrugType = async () => {
        try {
        const res = await axios.post('/api/test');
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const putDrugType = async () => {
        try {
            const res = await axios.put('/api/test');
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteDrugType = async () => {
        try {
            const res = await axios.delete('/api/test');
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getDrugType,
        getDrugType,
        postDrugType,
        putDrugType,
        deleteDrugType
    }
}

export default CURDDrugType;