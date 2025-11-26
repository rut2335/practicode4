using TodoApi;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// הגדרת CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// קריאת Connection String ישירות מ-Environment Variable
var conn = Environment.GetEnvironmentVariable("ToDoDB")
           ?? builder.Configuration.GetConnectionString("ToDoDB")
           ?? throw new Exception("Connection String 'ToDoDB' not found!");

Console.WriteLine($"=== Connection String Found: {conn.Substring(0, Math.Min(30, conn.Length))}... ===");

// הגדרת DbContext
builder.Services.AddDbContext<ToDoDbContext>(options =>
{
    options.UseMySql(conn, new MySqlServerVersion(new Version(8, 0, 21)));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", () => "ברוך הבא ל-API של רשימת המשימות!");

app.MapGet("/items", async (ToDoDbContext db) =>
{
    return await db.Items.ToListAsync();
});

app.MapPost("/items", async (ToDoDbContext db, Item newItem) =>
{
    db.Items.Add(newItem);
    await db.SaveChangesAsync();
    return Results.Created($"/items/{newItem.Id}", newItem);
});

app.MapPut("/items/{id}", async (ToDoDbContext db, int id, Item updatedItem) =>
{
    var existingItem = await db.Items.FindAsync(id);
    if (existingItem == null)
    {
        return Results.NotFound();
    }
    existingItem.Name = updatedItem.Name;
    existingItem.IsComplete = updatedItem.IsComplete;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/items/{id}", async (ToDoDbContext db, int id) =>
{
    var item = await db.Items.FindAsync(id);
    if (item == null)
    {
        return Results.NotFound();
    }
    db.Items.Remove(item);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
```

---

## עכשיו ב-Render:

1.היכנסי ל - **Render Dashboard * *
2.אפליקציית השרת → **Environment**
3. **וודאי שיש משתנה בשם `ToDoDB`** (בלי `ConnectionStrings__`)
4. הערך צריך להיות:
```
   Server = bueokunijyplsfhtqbaw - mysql.services.clever - cloud.com; Port = 3306; Database = bueokunijyplsfhtqbaw; User Id = uafujnda2en4tilg; Password = i0e8ACR3pXiLSmkvqO0l;