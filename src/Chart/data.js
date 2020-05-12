export default React.createClass({



render() {
return (
  <ResponsiveContainer width="100%" aspect={3}>
      <AreaChart width={600} height={400} data={this.state.data}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <XAxis height={60} dataKey="date"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          {this._drawAreas()}
         <Legend/>
      </AreaChart>
  </ResponsiveContainer>
)} })