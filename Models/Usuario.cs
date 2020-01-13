using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Task.Models
{
    public class Usuario : BaseEntity
    {
        [Key]
        public int? Id_usuario { get; set; }
        [Required]
        public string Nombre { get; set; }
        public string Paterno { get; set; }
        public string Materno { get; set; }
        public int Edad { get; set; }
        public int? Id_direccion { get; set; }
    }
}
