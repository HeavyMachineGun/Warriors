using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Task.Models;

namespace Task.Repositorio
{
    public class DireccionRepository : ConnectionDB, IRepository<Direccion>
    {
        IConfiguration configuration;
        public DireccionRepository(IConfiguration configuration) : base(configuration)
        {
            this.configuration = configuration;
        }

        public int Create(Direccion elemento)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();

                int id_direccion=dbConnection.ExecuteScalar<int>(@"INSERT INTO  Direccion(Calle,Colonia,Delegacion,Numero) 
                                        VALUES(@Calle,@Colonia,@Delegacion,@Numero)
                                        RETURNING Id_direccion", elemento);
                UsuarioRepository repository = new UsuarioRepository(configuration);
                Usuario usuario=repository.FindById(elemento.Id_usuario);
                usuario.Id_direccion = id_direccion;
                repository.Update(usuario);
                return id_direccion;
            }
        }

        public void Delete(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                dbConnection.Execute(@"DELETE FROM Direccion WHERE Id_Direccion=@Id_Direccion", id);
            }
        }

        public IEnumerable<Direccion> FindAll()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Direccion>("SELECT  * FROM Direccion");
            }
        }

        public Direccion FindById(int? id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Direccion>("SELECT  * FROM Direccion WHERE id_Direccion=@Id", new
                {
                    Id = id
                }).FirstOrDefault();

            }
        }

        public void Update(Direccion elemento)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                dbConnection.Execute(@"UPDATE  Direccion SET Calle=@Calle
                ,Colonia=@Colonia
                , Delegacion=@Delegacion
                ,Numero=@Numero WHERE id_direccion=@Id_Direccion", elemento);
            }
        }

    }
}
