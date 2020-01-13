using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Task.Models;
using Task.Repositorio;

namespace Task.Controllers
{
    public class UsuarioController : Controller
    {
        private readonly UsuarioRepository _usuarioRepository;

        public UsuarioController(IConfiguration configuration)
        {
            _usuarioRepository = new UsuarioRepository(configuration);
        }
        // GET: Usuario
        public ActionResult Index()
        {
            return PartialView();
        }

        // GET: Usuario/Details/5
        [HttpGet("{id}")] 
        public ActionResult<Usuario> Details(int id)
        {
            try
            {
                return _usuarioRepository.FindById(id);
            }
            catch
            {
                return BadRequest();
            }
        }
        // GET: Usuario/Details/
        public ActionResult<IEnumerable<Usuario>> Details()
        {
            try
            {
                return new JsonResult(_usuarioRepository.FindAll());
            }
            catch(Exception e) {
                return BadRequest(); 
            }
            
        }

        // POST: Usuario/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([FromBody]Usuario collection)
        {
            try
            {
                // TODO: Add insert logic here
                if (ModelState.IsValid)
                {
                    _usuarioRepository.Create(collection);
                }
                return NoContent();
            }
            catch(Exception e)
            {
                return BadRequest(new { error = "verifica los datos" });
            }
        }
        // POST: Usuario/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([FromBody]Usuario collection)
        {
            try
            {
                // TODO: Add update logic here
                if (ModelState.IsValid)
                {
                    _usuarioRepository.Update(collection);
                }
                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        // POST: Usuario/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            try
            {
                _usuarioRepository.Delete(id);
                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}