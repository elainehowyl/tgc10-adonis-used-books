'use strict'

const Authors = use('App/Models/Author')

class AuthorController {
  async index({view}){
    let allAuthors = await Authors.all()
    return view.render('authors/allauthors',{
      "authors":allAuthors.toJSON()
    })
  }
  async authorInfo({request, params, view}){
    let author_id = request.params.author_id
    let author = await Authors.find(author_id)
    return view.render('authors/author',{
      "author":author
    })
  }
  create({view}){
    return view.render('authors/createauthor')
  }
  async processCreate({request,response}){
    let newAuthor = request.post()
    let author = new Authors()
    author.firstname = newAuthor.firstname
    author.lastname = newAuthor.lastname
    author.dateofbirth = newAuthor.dob
    await author.save()
    response.route('main_author_page')
  }

  async update({request, params, view}){
    let author = await Authors.find(request.params.author_id)
    return view.render('authors/updateauthor', {
      "author":author.toJSON()
    })
  }

  async processUpdate({request, response}){
    let author = await Authors.find(request.params.author_id)
    let updatedAuthor = request.post()
    author.firstname = updatedAuthor.firstname
    author.lastname = updatedAuthor.lastname
    author.dateofbirth = updatedAuthor.dob
    await author.save()
    response.route('main_author_page')
  }

  async delete({request, response}){
    let author = await Authors.find(request.params.author_id)
    await author.delete()
    response.route('main_author_page')
  }
}

module.exports = AuthorController
