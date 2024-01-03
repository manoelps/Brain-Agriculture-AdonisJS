import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.resource('/farmers', 'FarmersController').apiOnly()
  }).prefix('/v1')
}).prefix('/api')
