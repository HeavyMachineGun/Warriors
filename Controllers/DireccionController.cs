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
    public class DireccionController : Controller
    {
        private readonly DireccionRepository _direccionRepository;

        public DireccionController(IConfiguration configuration)
        {
            _direccionRepository = new DireccionRepository(configuration);
        }

        // GET: Direccion/Details/5
        [HttpGet("{id}")]
        public ActionResult<Direccion> Details(int id)
        {
            return _direccionRepository.FindById(id);
        }
        [HttpGet]
        public ActionResult<IEnumerable<Direccion>> Details()
        {

            return new JsonResult(_direccionRepository.FindAll());
        }

        // POST: Direccion/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([FromBody] Direccion collection)
        {
            try
            {
                // TODO: Add insert logic here

                _direccionRepository.Create(collection);
                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }


        // POST: Direccion/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([FromBody] Direccion collection)
        {
            try
            {
                // TODO: Add update logic here

                _direccionRepository.Update(collection);
                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        // POST: Direccion/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            try
            {
                // TODO: Add delete logic here

                _direccionRepository.Delete(id);
                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}