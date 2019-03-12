import path from "path";

module.exports = {
    output: path.resolve(__dirname, "../server/public"),
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000"
            }
        }
    }
};