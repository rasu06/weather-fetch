const resfetch= async (api)=>{
   try{
      console.log("knckdn");
   const obj=await axios.get(api); 
    return obj;
   }
    catch(e)
    {
        console.log("error",e);
        return e;
    }
};
window.addEventListener("load",()=>{
     let lati;
     let long;
    
     if(navigator.geolocation)
     {
       
           const Geolocation=navigator.geolocation;
           Geolocation.getCurrentPosition((position)=>
           {
              lati=position.coords.latitude;
              long=position.coords.longitude;             
              let api=`https://api.weatherbit.io/v2.0/current?key=b1a76c1759154a67abe67c01e44fadc6&lat=${lati}&lon=${long}&include=minutely`;
              console.log(api);
         resfetch(api)
              .then((return_object)=>
              {
                 console.dir(return_object);
                 let temp=return_object.data.data[0].temp;
               let desc=return_object.data.data[0].weather.description;
               let icon=return_object.data.data[0].weather.icon;
               let timezone=return_object.data.data[0].timezone;

             
               const comment=document.querySelector(".temp-comment");
               const icon_temp=document.querySelector(".icon");
               const location=document.querySelector(".location");
              const value=document.querySelector(".value");
              const h2=document.querySelector(".temp1-value");

              h2.innerHTML=`${temp}`;
               comment.innerHTML=`${desc}`;
              icon_temp.src=`https://www.weatherbit.io/static/img/icons/${icon}.png`;
               location.innerHTML=`${timezone}`;
             value.addEventListener("click",()=>
              {
                  
                  const temp_type=document.querySelector(".tempspan");
                 if(temp_type.textContent==="C")
                 {
                    temp_type.textContent="F";                  
                      const farenhiet=(9/5)*temp+32;
                     h2.innerHTML=`${Math.floor(farenhiet)}`;
                 }
                 else
                 {
                    temp_type.textContent="C";
                  h2.innerHTML=`${temp}`;
                  
                 }
               });
              });
           });

     }
     else
     {
        alert('Please enable location access to fetch deatils');
     }

});
