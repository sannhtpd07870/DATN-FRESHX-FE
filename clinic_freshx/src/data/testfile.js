import axios from '../services/axios';

const CURDtestfile = () => {
    const getfile = async() =>{
        try{
            const res = await axios.get('File');
            console.log(res);
            return res;
        }
        catch(error){
            console.error(error)
        }
    }
    const getimg = async () => {
        try {
            const res = await axios.get('File/GetAllFilesInBlob');
            console.log(res);
            return res;
          
        } catch (error) {
            console.error(error);
        }
    }

    const posttestfile = async () => {
        try {
        const res = await axios.post('/api/test');
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const puttestfile = async () => {
        try {
            const res = await axios.put('/api/test');
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    const deletetestfile = async () => {
        try {
            const res = await axios.delete('/api/test');
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getfile,
        getimg,
        posttestfile,
        puttestfile,
        deletetestfile
    }
}

export default CURDtestfile;