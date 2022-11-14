using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks.Sources;

namespace DapperContext
{
    public class DataContext
    {
        public IConfiguration Configuration;
        private readonly string _connectionString;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
            _connectionString = Configuration.GetConnectionString("Default");
        }

        public IDbConnection GetConnection()
            => new SqlConnection(_connectionString);
    }
}
