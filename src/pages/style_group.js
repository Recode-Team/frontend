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
        fontSize:'20px',

    },

    wbIcon:{
        margin:'10px',
        float:'right',
        display:'flex',
        fontSize:'20px',

    },

    myPJ:{
        fontSize:'30px',
        margin:'25px',
    },

    pjp:{
        // textAlign: 'center',
        height:'auto'
        // margin:'120px'

    },

    ph:{
        display:'inline',
        height:'90px',
        width:'120px',

    },

    pj:{
        display:'inline',
        padding:'70px 120px',
        margin:'30px',
        backgroundColor:'#ebeef6',
        border:'1px solid gray',
        borderRadius:'20px',
        visibility: 'hidden',

    },

    a:{
        display:'inline',
        width:'20px'
    },

    cBtn:{
        width:'120px',
        height:'40px',
        fontSize:'16px',
        border:'none',
        borderRadius:'5px',
        backgroundColor:'#81BCFF',
        marginLeft:'35px'
    }

}))

export default groupStyle