/**
 * Created by cesar on 20/02/2019.
 */

importScripts('js/AxSw.js')

const STATIC_CACHE      = 'ax_static_v1';
const DYNAMIC_CACHE     = 'ax_dynamic_v1';
const INMUTABLE_CACHE   = 'ax_inmutable_v1';


const APP_STATIC_SHEL = [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/spiderman.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/wolverine.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/hulk.jpg',
    'js/app.js',
    'js/AxSw.js'

];

const APP_INMUTABLE_SHEL = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'

];


self.addEventListener('install', e => {

    const staticCache = caches.open(STATIC_CACHE)
        .then(cache => {
            cache.addAll(APP_STATIC_SHEL);
        });

    const inmutableCache = caches.open(INMUTABLE_CACHE)
        .then(cache => {
            cache.addAll(APP_INMUTABLE_SHEL);
        });


    e.waitUntil(Promise.all([staticCache,inmutableCache]));

});

self.addEventListener('activate', e => {

    const promesa = caches.keys()
        .then(keys => {
            keys.forEach(key => {

                if( key !== STATIC_CACHE && key.includes('static')){

                    return caches.delete(key);

                }

            });
        });

    e.waitUntil( promesa );

});


self.addEventListener('fetch', e => {

    const respuesta = caches.match( e.request)
        .then(res => {

            if( res ){
                return res;
            }else{
                return fetch( e.request )
                    .then(newRes => {
                        AxSw.updateCache(DYNAMIC_CACHE,e.request,newRes);
                    });
            }

        });

    e.waitUntil( respuesta );

});