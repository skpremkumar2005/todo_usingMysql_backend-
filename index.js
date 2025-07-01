const express=require('express');
const dotenv = require('dotenv');
dotenv.config();
const app=express();
const mysql = require('mysql2');
app.use(express.json());


const db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });
app.get('/',(req,res)=>{
    res.json({message:"hello from port 3000"});
})
app.post('/enter',async (req,res)=>{
    const {username,password,address}=req.body;
   db.query('select * from user where username=?',[username],(err,result)=>{
        if(err){
            return res.status(500).json({error:"databalse error"});
        }
        if(result.length > 0){
            return res.status(400).json({error:"username already exists"});
        }
        const query='insert into user(username,password,address) values(?,?,?)';
   db.query(query,[username,password,address],(err,result)=>{
        if(err){
            return res.status(500).json({error:"database error"});
        }
        
     res.status(201).json({message:"user created successfully"});
    });
    })
    
});
let a=[];
app.put('/enter',(req,res)=>{
   let {username,password,address}=req.body;
    db.query('select * from user where username=?',[username],(err,resule)=>{
        if( resule.length === 0){
           return res.status(404).json({error:"user not found"});      
        }
        else if(err){
            return res.status(500).json({error:"database error2"});
        }
        password= password || resule[0].password;
        address = address || resule[0].address;
        a= resule[0];
        const query='update user set password=?,address=? where username=?';
        db.query(query,[username,password,address],(err,result)=>{
            if(err){
                return res.status(500).json({error:"database error"});
            }
            
         res.status(201).json({message:a.username + " user updated successfully"});
        });

    })
  
  
 
});
app.delete('/enter',(req,res)=>{
    let {username}=req.body;
     db.query('select * from user where username=?',[username],(err,resule)=>{
         if( resule.length === 0){
            return res.status(404).json({error:"user not found"});      
         }
         else if(err){
             return res.status(500).json({error:"database error2"});
         }
         const query='delete from user where username=?';
         db.query(query,[username],(err,result)=>{
             if(err){
                 return res.status(500).json({error:"database error"});
             }
             
          res.status(201).json({message: " deleted successfully"});
         });
     })
   
   

 });
 app.get('/notes',(req,res)=>{
    db.query("select * from notes where username=? ",[req.body.username],(err,result)=>{
        if(err){return res.status(500).json({error:"database error"});}
        if(result.length === 0){
            return res.status(404).json({error:"no notes found"});
        }
        return res.status(200).json({notes:result});
    })
 })
 app.post('/notes',(req,res)=>{
  db.query('select * from notes where username=? and id=?',[req.body.username,req.body.id],(err,result)=>{
    if(err){return res.status(500).json({error:"database error"});}
    else if(result.length > 0){
        return res.status(400).json({error:"note already exists"});
    }
    db.query("insert into notes(id,username,notes) values(?,?,?)",[req.body.id,req.body.username,req.body.notes],(err,result)=>{
        if(err){return res.status(500).json({error:"database error"});}
        if(result.length === 0){
            return res.status(404).json({error:"no notes found"});    }    
    })
    return res.status(201).json({message:"note created successfully"});
  })
 })
 app.put('/notes',(req,res)=>{
    
    db.query('select * from notes where username=? and id=?',[req.body.username,req.body.id],(err,result)=>{
      if(err){return res.status(500).json({error:"database error"});}
      else if(result.length == 0){
          return res.status(400).json({error:"note  not exists"});
      }
      db.query("update  notes set notes=? where id=? and username=? ",[req.body.notes,req.body.id,req.body.username],(err,result)=>{
          if(err){return res.status(500).json({error:"database error"});}
          if(result.length === 0){
              return res.status(404).json({error:"no notes found"});    }    
      })
      return res.status(201).json({message:"note update successfully"});
    })
   })
   app.delete('/notes',(req,res)=>{
    
    db.query('select * from notes where username=? and id=?',[req.body.username,req.body.id],(err,result)=>{
      if(err){return res.status(500).json({error:"database error"});}
      else if(result.length == 0){
          return res.status(400).json({error:"note  not exists"});
      }
      db.query("delete from note where id=? and username=?",[req.body.id,req.body.username],(err,result)=>{
          if(err){return res.status(500).json({error:"database error"});}
          if(result.length === 0){
              return res.status(404).json({error:"no notes found"});    }    
      })
      return res.status(201).json({message:"note deleted successfully"});
    })
   })
 

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});
app.listen(3000,()=>{
    console.log("server.is running on port 3000");
});

