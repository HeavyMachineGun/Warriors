using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Task.Repositorio
{
    public abstract class ConnectionDB
    {
        public string connectionString;
        public ConnectionDB(IConfiguration config)
        {
            connectionString = config.GetValue<string>("ConnectionStrings:Default");
        }
        protected IDbConnection Connection
        {
            get
            {
                return new NpgsqlConnection(connectionString);
            }

        }
    }
}
