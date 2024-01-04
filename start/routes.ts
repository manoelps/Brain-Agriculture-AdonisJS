import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.resource('/farmers', 'FarmersController').apiOnly()
    Route.delete('/farmers/:id/crops', 'FarmersController.destroyPlantedCrop')

    Route.get('/crops', 'PlantedCropsController.index')

    Route.get('/dashboard', 'DashboardController.index')
  }).prefix('/v1')
}).prefix('/api')
