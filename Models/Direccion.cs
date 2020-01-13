using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Task.Models
{
    public class Direccion :BaseEntity
    {
        [Key]
        public int? Id_direccion { get; set; }
        [Required]
        public string Calle { get; set; }
        [Required]
        public string Colonia { get; set; }
        public string Delegacion{ get; set; }

        public int? Numero { get; set; }
        public int? Id_usuario{ get; set; }


    }
}
