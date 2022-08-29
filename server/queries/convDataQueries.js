const getConvdata = "SELECT * FROM conv3_full ORDER BY tstamp DESC LIMIT 60";
const getConvstat = "SELECT * FROM conv3_stat1 ORDER BY tstamp DESC LIMIT 2";



module.exports = {
    getConvdata,
    getConvstat,
}