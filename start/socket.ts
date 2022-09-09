import Order from "App/Models/Order";
import Ws from "App/Services/Ws";
Ws.boot();
Ws.io.on("connection", (socket) => {
  console.log(`[Socket.io]: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log(`[Socket.io]: A user disconnected: ${socket.id}`);
  });
  socket.on("order:update", (data: Order) => {
    socket.broadcast.emit("news", {
      message: "Venda Atualizada!",
      uuid: data.id,
      orderId: data.id,
    });
  });
  socket.on("order:new", (data: Order) => {
    socket.broadcast.emit("news", {
      message: data.status === "paid" ? "Venda Efetuada!" : "Venda Cadastrada!",
      uuid: data.id,
      orderId: data.id,
    });
  });
  socket.on("order:delete", () => {
    socket.broadcast.emit("news", {
      message: "Venda deleta!",
    });
  });
});
