using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task.Models;

namespace Task.Repositorio
{
    public interface IRepository<T> where T: BaseEntity
    {
        int Create(T elemento);
        void Update(T elemento);
        public T FindById(int? id);
        void Delete(int id);
        public IEnumerable<T> FindAll();


    }
}
