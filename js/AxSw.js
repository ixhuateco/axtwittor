


const AxSw ={
    updateCache: (cacheName,req,res)=>{

        if ( res.ok ) {
            caches.open(cacheName)
                .then(cache => {

                    cache.put(req,res.clone());

                    return res.clone();

                });
        }else{
            return res;
        }

    }
};

