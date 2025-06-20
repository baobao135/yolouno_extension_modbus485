Blockly.Blocks['modbus_init'] = {
  init: function () {
    this.jsonInit({
      type: "modbus_init",
      message0: "khởi tạo Modbus RX %1 TX %2 Baudrate %3",
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: "field_dropdown", name: "RX", options: digitalPins },
        { type: "field_dropdown", name: "TX", options: digitalPins },
        { type: "field_number", name: "BAUD", value: 9600 }
      ],
      colour: 230,
      tooltip: "Khởi tạo kết nối Modbus RTU",
      helpUrl: ""
    });
  }
};

Blockly.Blocks['modbus_read_input_registers'] = {
  init: function () {
    this.jsonInit({
      message0: "đọc input register thiết bị %4 %1 địa chỉ %5 %2 số lượng %6 %3",
      args0: [
        { type: "input_value", name: "SLAVE_ID"},
        { type: "input_value", name: "ADDRESS"},
        { type: "input_value", name: "QUANTITY"},
        { type: "input_dummy" },
        { type: "input_dummy" },
        { type: "input_dummy" }
      ],
      output: null,
      colour: 160,
      tooltip: "Đọc input register từ thiết bị Modbus",
      helpUrl: ""
    });
  }
};

Blockly.Blocks['modbus_read_holding_registers'] = {
  init: function () {
    this.jsonInit({
      message0: "đọc holding register thiết bị %4 %1 địa chỉ %5 %2 số lượng %6 %3",
      args0: [
        { type: "input_value", name: "SLAVE_ID"},
        { type: "input_value", name: "ADDRESS"},
        { type: "input_value", name: "QUANTITY"},
        { type: "input_dummy" },
        { type: "input_dummy" },
        { type: "input_dummy" }
      ],
      output: null,
      colour: 160,
      tooltip: "Đọc holding register từ thiết bị Modbus",
      helpUrl: ""
    });
  }
};

Blockly.Blocks['modbus_write_single_register'] = {
  init: function () {
    this.jsonInit({
      message0: "ghi giá trị %4 %3 vào register thiết bị %5 %1 địa chỉ %6 %2",
      args0: [
        { type: "input_value", name: "SLAVE_ID"},
        { type: "input_value", name: "ADDRESS"},
        { type: "input_value", name: "VALUE"},
        { type: "input_dummy" },
        { type: "input_dummy" },
        { type: "input_dummy" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 20,
      tooltip: "Ghi giá trị vào holding register",
      helpUrl: ""
    });
  }
};


Blockly.Python['modbus_init'] = function(block) {
  const rx = block.getFieldValue('RX');
  const tx = block.getFieldValue('TX');
  const baud = block.getFieldValue('BAUD');

  Blockly.Python.definitions_['import_modbus_master'] = 'from modbus_master import ModbusRTU';
  Blockly.Python.definitions_['create_modbus_master'] = `modbus = ModbusRTU(rx=${rx}_PIN, tx=${tx}_PIN, baudrate=${baud})\n`;
  const code =``
  return code;
};

Blockly.Python['modbus_read_input_registers'] = function(block) {
  const slave = Blockly.Python.valueToCode(block, 'SLAVE_ID', Blockly.Python.ORDER_ATOMIC);
  const addr = Blockly.Python.valueToCode(block, 'ADDRESS', Blockly.Python.ORDER_ATOMIC);
  const qty = Blockly.Python.valueToCode(block, 'QUANTITY', Blockly.Python.ORDER_ATOMIC);
  const code = `modbus.read_input_registers(${slave}, ${addr}, ${qty})`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['modbus_read_holding_registers'] = function(block) {
  const slave = Blockly.Python.valueToCode(block, 'SLAVE_ID', Blockly.Python.ORDER_ATOMIC);
  const addr = Blockly.Python.valueToCode(block, 'ADDRESS', Blockly.Python.ORDER_ATOMIC);
  const qty = Blockly.Python.valueToCode(block, 'QUANTITY', Blockly.Python.ORDER_ATOMIC);
  const code = `modbus.read_holding_registers(${slave}, ${addr}, ${qty})`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['modbus_write_single_register'] = function(block) {
  const slave = Blockly.Python.valueToCode(block, 'SLAVE_ID', Blockly.Python.ORDER_ATOMIC);
  const addr = Blockly.Python.valueToCode(block, 'ADDRESS', Blockly.Python.ORDER_ATOMIC);
  const value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
  const code = `modbus.write_single_register(${slave}, ${addr}, ${value})\n`;
  return code;
};
