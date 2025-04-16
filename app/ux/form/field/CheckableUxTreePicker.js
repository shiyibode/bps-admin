Ext.define('MyApp.ux.form.field.CheckableUxTreePicker', {
    extend: 'Ext.form.field.Picker',
    xtype: 'checkableuxtreepicker',

    mixins: ['Ext.util.StoreHolder'],

    requires: [
        'Ext.data.StoreManager'
    ],

    uses: [
        'Ext.tree.Panel'
    ],

    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',

    config: {
        /**
         * @cfg {Ext.data.TreeStore} store
         * A tree store that the tree picker will be bound to
         */
        store: null,

        /**
         * @cfg {String} displayField
         * The field inside the model that will be used as the node's text.
         * Defaults to the default value of {@link Ext.tree.Panel}'s `displayField` configuration.
         */
        displayField: null,

        /**
         * @cfg {Array} columns
         * An optional array of columns for multi-column trees
         */
        columns: null,

        /**
         * @cfg {Boolean} selectOnTab
         * Whether the Tab key should select the currently highlighted item. Defaults to `true`.
         */
        selectOnTab: true,

        /**
         * @cfg {Number} maxPickerHeight
         * The maximum height of the tree dropdown. Defaults to 300.
         */
        maxPickerHeight: 300,

        /**
         * @cfg {Number} minPickerHeight
         * The minimum height of the tree dropdown. Defaults to 100.
         */
        minPickerHeight: 100,

        rootVisible: true
    },

    editable: false,

    checkable: false,

    /**
     * @event select
     * Fires when a tree node is selected
     * @param {Ext.ux.TreePicker} picker        This tree picker
     * @param {Ext.data.Model} record           The selected record
     */

    initComponent: function () {
        var me = this,
            store = me.store;

        me.callParent(arguments);

        me.delayhide = Ext.create('Ext.util.DelayedTask',
            function () {
                me.collapse(true);
            });
        //如果store是string类型，寻找对应的store
        if (Ext.isString(store)) {
            store = me.store = Ext.data.StoreManager.lookup(store);
        }
        //绑定store
        if (store) {
            me.setStore(store);
        } else {
            //动态绑定store
            me.bindStore(me.store, true);
        }

        // me.mon(me.store, {
        //     scope: me,
        //     load: me.onLoad,
        //     update: me.onUpdate
        // });
    },

    /**
     * Creates and returns the tree panel to be used as this field's picker.
     */
    createPicker: function () {
        var me = this,
            picker = new Ext.tree.Panel({
                baseCls: Ext.baseCSSPrefix + 'boundlist',
                shrinkWrapDock: 2,
                store: me.store,
                floating: true,
                displayField: me.displayField,
                columns: me.columns,
                minHeight: me.minPickerHeight,
                maxHeight: me.maxPickerHeight,
                manageHeight: false,
                shadow: false,
                rootVisible: me.rootVisible,
                scrollable: true,
                selModel: me.checkable ? {
                    mode: 'SIMPLE',
                    ignoreRightMouseSelection: true
                } : null,
                listeners: {
                    scope: me,
                    itemclick: me.onItemClick,
                    itemkeydown: me.onPickerKeyDown
                }
            }),
            view = picker.getView();

        if (Ext.isIE9 && Ext.isStrict) {
            // In IE9 strict mode, the tree view grows by the height of the horizontal scroll bar when the items are highlighted or unhighlighted.
            // Also when items are collapsed or expanded the height of the view is off. Forcing a repaint fixes the problem.
            view.on({
                scope: me,
                highlightitem: me.repaintPickerView,
                unhighlightitem: me.repaintPickerView,
                afteritemexpand: me.repaintPickerView,
                afteritemcollapse: me.repaintPickerView
            });
        }
        return picker;
    },

    /**
     * repaints the tree view
     */
    repaintPickerView: function () {
        var style = this.picker.getView().getEl().dom.style;

        // can't use Element.repaint because it contains a setTimeout, which results in a flicker effect
        style.display = style.display;
    },

    /**
     * Handles a click even on a tree node
     * @private
     * @param {Ext.tree.View} view
     * @param {Ext.data.Model} record
     * @param {HTMLElement} node
     * @param {Number} rowIndex
     * @param {Ext.event.Event} e
     */
    onItemClick: function (view, record, node, rowIndex, e) {
        if (record && this.checkable) {
            var picker = this.getPicker();
            var selModel = picker.getSelectionModel();
            var selected = selModel.isSelected(record);
            record.set('checked', selected);
        }
        this.selectItem(record);
    },

    /**
     * Handles a keypress event on the picker element
     * @private
     * @param {Ext.event.Event} e
     * @param {HTMLElement} el
     */
    onPickerKeyDown: function (treeView, record, item, index, e) {
        var key = e.getKey();

        if (key === e.ENTER || (key === e.TAB && this.selectOnTab)) {
            this.selectItem(record);
        }
    },

    /**
     * Changes the selection to a given record and closes the picker
     * @private
     * @param {Ext.data.Model} record
     */
    selectItem: function (record) {
        var me = this;
        if (record) {
            if (me.checkable) {
                var checkNodes = me.getPicker().getChecked();
                var values = new Array();
                Ext.each(checkNodes, function (node) {
                    values.push(node.getId());
                });
                me.setValue(values);
            } else {
                me.setValue(record.getId());
            }
            me.fireEvent('select', me, record);
            // me.collapse();
        }
    },

    /**
     * Runs when the picker is expanded.  Selects the appropriate tree node based on the value of the input element,
     * and focuses the picker so that keyboard navigation will work.
     * @private
     */
    onExpand: function () {
        var picker = this.picker,
            store = picker.store,
            value = this.value,
            node;

        if (value) {
            node = store.getNodeById(value);
        }

        if (!node) {
            node = store.getRoot();
        }

        picker.ensureVisible(node, {
            select: true,
            focus: true
        });
    },

    /**
     * Sets the specified value into the field
     * @param {Mixed} value
     * @return {Ext.ux.TreePicker} this
     */
    setValue: function (value) {
        var me = this,
            record;

        me.value = value;

        if (!me.store || me.store.loading) {
            // Called while the Store is loading. Ensure it is processed by the onLoad method.
            return me;
        }

        // if (me.checkable && (!value || value.length <= 0)) {//清空组件值或设置值为''是取消对所有节点的选择
        if (me.checkable) {//清空组件值或设置值为''是取消对所有节点的选择
            var root = me.store.getRoot();
            if (root) {
                me.depathNode(root);
            }
        }

        if (value instanceof Array) {
            var picker = this.getPicker();
            var selModel = picker.getSelectionModel();
            var records = new Array();
            var rawValue = '';
            Ext.each(value, function (v) {
                if (v) {
                    record = me.store.getNodeById(v);
                    if (record) {
                        records.push(record);
                        record.set('checked', true);
                        rawValue = rawValue.length > 0 ? rawValue + ',' + record.get(me.displayField) : record.get(me.displayField);
                    }
                }
            });
            selModel.select(records);
            me.setRawValue(rawValue);
        } else {
            // try to find a record in the store that matches the value
            // record = value ? me.store.getNodeById(value) : me.store.getRoot();
            // if (value === undefined) {
            //     record = me.store.getRoot();
            //     me.value = record.getId();
            // } else {
            //     record = me.store.getNodeById(value);
            // }

            record = value ? me.store.getNodeById(value) : null;

            // set the raw value to the record's display field if a record was found
            me.setRawValue(record ? record.get(me.displayField) : '');

        }

        //bindValue
        me.mixins.field.setValue.call(this, value);

        me.fireEvent('change', me, me.value);

        return me;
    },

    getSubmitValue: function () {
        return this.value;
    },

    /**
     * Returns the current data value of the field (the idProperty of the record)
     * @return {Number}
     */
    getValue: function () {
        return this.value;
    },

    depathNode: function (node) {
        if (!node) {
            return;
        }
        var picker = this.getPicker();
        var selModel = picker.getSelectionModel();
        selModel.deselect(node);
        node.set('checked', false);
        node.eachChild(function (node) {
            node.set('checked', false);
            this.depathNode(node);
        }, this);
    },

    /**
     * Handles the store's load event.
     * @private
     */
    onLoad: function () {
        var me = this;

        if (me.checkable) {
            var root = me.store.getRoot();
            if (root) {
                me.depathNode(root);
            }
        }

        var value = me.value;

        if (value) {
            me.setValue(value);
        }
    },

    onUpdate: function (store, rec, type, modifiedFieldNames) {
        var display = this.displayField;

        if (type === 'edit' && modifiedFieldNames && Ext.Array.contains(modifiedFieldNames, display) && this.value === rec.getId()) {
            this.setRawValue(rec.get(display));
        }
    },

    setStore: function (store) {
        if (store) {
            this.store = store;
            this.onLoad();
        }
    },

    bindStore: function (store, initial) {
        this.mixins.storeholder.bindStore.apply(this, arguments);
    }

});