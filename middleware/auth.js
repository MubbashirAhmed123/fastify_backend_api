import jwt from 'jsonwebtoken'

export const isAuthenticated= (req,rep,next)=>{
    

    try {
        const token=req.headers['authorization'].split(' ')[1]
        console.log(token)
        if(token){
            const data= jwt.verify(token,'sajhgcjh4098hfwj!#%$erfejh')
            req.user=data.email
        }
        next()
    } catch (error) {
        rep.status(404).send({msg:"invalid token"})
        
    }

}