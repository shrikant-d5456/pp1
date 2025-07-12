import express from 'express';
import 
{    
    onlyHostedData,
    ifValidationTrue,
    getAllData,
    
    updateByAdmin1,
    updateByAdmin2,
    updateByAdmin3,
    updateByAdmin4,
    updateByAdmin5,
    
    validator1_checking,
    validator1_checked_post,
    validator2_checking,
    validator2_checked_post,
    validator3_checking,
    validator3_checked_post,
    validator4_checking,
    validator4_checked_post,
    validator5_checking,
    validator5_checked_post,
} 
from '../controller/VerificationFunctions.js';

const router = express.Router();

// router.post('/create', createMedicine);

router.get('/', getAllData);

router.put('/admin1/:id', updateByAdmin1);
router.put('/admin2/:id', updateByAdmin2);
router.put('/admin3/:id', updateByAdmin3);
router.put('/admin4/:id', updateByAdmin4);
router.put('/admin5/:id', updateByAdmin5);

router.post('/admin/postData/:id', ifValidationTrue);

router.get('/hostData', onlyHostedData);

router.get('/validator1-checking',validator1_checking);
router.get('/validator1-checked-post',validator1_checked_post);

router.get('/validator2-checking',validator2_checking);
router.get('/validator2-checked-post',validator2_checked_post);

router.get('/validator3-checking',validator3_checking);
router.get('/validator3-checked-post',validator3_checked_post);

router.get('/validator4-checking',validator4_checking);
router.get('/validator4-checked-post',validator4_checked_post);

router.get('/validator5-checking',validator5_checking);
router.get('/validator5-checked-post',validator5_checked_post);



export default router;