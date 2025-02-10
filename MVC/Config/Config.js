import {connect} from 'mongoose'
connect('mongodb+srv://kananskaf206:af206@cluster0.f2dg1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{console.log('Successfully connected!');})