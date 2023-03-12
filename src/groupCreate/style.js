import { makeStyles } from "@material-ui/core";

const groupStyle = makeStyles((theme)=>({
    head:{
        height: '50px',
        background: 'FFFFFF',
        border:'1px solid gray'
    },

    wb1:{
        margin:'10px',
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
        fontSize:'20px'
    },

    wbIcon:{
        margin:'10px',
        float:'right',
        display:'flex',
        fontSize:'20px'
    },

    myPJ:{
        fontSize:'30px',
        margin:'25px',
    },

    PJP:{
        textAlign: 'center',
        height:'auto',
        
    },

    PJ:{
        display:'inline',
        padding:'70px 120px',
        backgroundColor:'#ebeef6',
        border:'1px solid gray',
        borderRadius:'10px',
        margin:'50px',

    },




}))
  
  export default groupStyle