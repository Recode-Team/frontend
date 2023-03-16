import { makeStyles } from "@material-ui/core";
import { display } from "@mui/system";

const groupSetStyle = makeStyles((theme)=>({

    gsMain:{
        height: '100%',
        width: '100%',

    },

    head:{
        height: '50px',
        background: 'FFFFFF',
        borderBottom:'1px solid gray'
    },

    wb1:{
        margin:'5px',
        marginLeft:'20px',
        float:'left',
        display: 'flex',
        color:'#c7d2f9',
        fontSize:'30px'

    },

    wb2:{
        margin:'10px',
        float:'right',
        display:'flex',
        fontSize:'20px',

    },

    wbIcon:{
        margin:'15px',
        float:'right',
        display:'flex',
        fontSize:'20px',

    },

    divLR:{
        height:'100%',
        width:'100%',
    },

    divL:{
        display:'inline-block',
        height:'100%',
        width:'30%',
        borderRight:'1px solid gray',
        float:'left',

    },

    divR:{
        display:'inline-block',
        height: '100%', 
        width:'60%',

    },

    ul:{

    },

    li:{

    },

    menuName:{
        borderBottom: '1px solid gray',
        width:'100%',
        display: 'flex',


    },

    hTow:{
        marginBlockEnd:'0.2em',
        marginBlockStart:'0.2em',
        width:'100%',
        textAlign:'center',
        display: 'flex',
        justifyContent: 'center',
    },



}))

export default groupSetStyle


// sMain:{
//     display:'flex',
//     position:'relative'
// },

// sList:{
//     width:'150px',
//     // display:'flex',
//     padding:'300px 50px',
//     borderRight:'1px solid gray',

// },

// sImform:{
//     width:'150px',
//     // display:'flex',
//     padding:'70px 200px',
//     position:'relative'

// },

// sP:{
//     float:'top',
//     position:'absolute',
// },

// as:{
//     padding:'70px 140px',
//     backgroundColor:'blue',
//     position:'absolute',

// }