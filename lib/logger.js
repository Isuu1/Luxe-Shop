//This is to check logs on the backend side when they are not showing up in the console

let logs = [];

export const logToMemory = (message) => {
  const timestamp = new Date().toISOString();
  logs.push({ timestamp, message });
  console.log(`${timestamp} - ${message}`);
};

export const getLogs = () => logs;
