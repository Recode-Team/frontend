import { makeStyles } from "@material-ui/core";
import { display } from "@mui/system";

const groupSetStyle = makeStyles((theme)=>({

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

    sMain:{
        display:'flex',
        position:'relative'
    },

    sList:{
        width:'150px',
        // display:'flex',
        padding:'300px 50px',
        borderRight:'1px solid gray',
    
    },

    sImform:{
        width:'150px',
        // display:'flex',
        padding:'70px 200px',
        position:'relative'

    },

    sP:{
        float:'top',
        position:'absolute',
    },

    as:{
        padding:'70px 140px',
        backgroundColor:'blue',
        position:'absolute',

    }

}))

export default groupSetStyle
