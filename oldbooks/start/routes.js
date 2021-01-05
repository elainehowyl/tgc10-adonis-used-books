'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.get('books/', 'BookController.index')
Route.get('books/:book_id', 'BookController.show').as('show_book')

Route.get('authors/', 'AuthorController.index').as('main_author_page')
// we move create before author id because if we don't do so, the program will substitute create as author id.
Route.get('authors/create', 'AuthorController.create').as('create_author')
Route.post('authors/create', 'AuthorController.processCreate')
Route.get('authors/:author_id', 'AuthorController.authorInfo').as('show_author')
