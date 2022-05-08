## Functions

<dl>
<dt><a href="#doId">doId(id)</a> ⇒ <code>*</code></dt>
<dd><p>Generate id or check.</p>
</dd>
<dt><a href="#doCreate">doCreate(data, doc)</a> ⇒ <code><a href="#Document">Document</a></code></dt>
<dd><p>Create a new document</p>
</dd>
<dt><a href="#doGet">doGet(data, id)</a> ⇒ <code><a href="#Document">Document</a></code></dt>
<dd><p>Get a document by id.</p>
</dd>
<dt><a href="#doCount">doCount(data, query)</a> ⇒ <code>number</code></dt>
<dd><p>Count document by query.</p>
</dd>
<dt><a href="#doList">doList(data, query, controls)</a> ⇒ <code>object</code></dt>
<dd><p>List documents.</p>
</dd>
<dt><a href="#doPatch">doPatch(data, query, controls)</a> ⇒ <code>number</code></dt>
<dd><p>Patch documents.</p>
</dd>
<dt><a href="#doRemove">doRemove(data, query)</a> ⇒ <code>number</code></dt>
<dd><p>Remove documents</p>
</dd>
<dt><a href="#align">align(origin, max, character)</a> ⇒ <code>string</code></dt>
<dd><p>Add prefix to origin text.</p>
</dd>
<dt><a href="#now">now()</a> ⇒ <code>number</code></dt>
<dd><p>Get unique now time.</p>
</dd>
<dt><a href="#generateId">generateId()</a> ⇒ <code>string</code></dt>
<dd><p>Generate unique id.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Collection">Collection</a> : <code>object</code></dt>
<dd><p>Collection structure.</p>
</dd>
<dt><a href="#Document">Document</a> : <code>object</code></dt>
<dd><p>Document structure.</p>
</dd>
<dt><a href="#Plugin">Plugin</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="doId"></a>

## doId(id) ⇒ <code>\*</code>
Generate id or check.

**Kind**: global function  
**Returns**: <code>\*</code> - Checked Id or a new ID.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>\*</code> | Id to check. Optional. |

<a name="doCreate"></a>

## doCreate(data, doc) ⇒ [<code>Document</code>](#Document)
Create a new document

**Kind**: global function  
**Returns**: [<code>Document</code>](#Document) - A created document.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | Data object. Required. |
| doc | [<code>Document</code>](#Document) | A document to be created. Required. |

<a name="doGet"></a>

## doGet(data, id) ⇒ [<code>Document</code>](#Document)
Get a document by id.

**Kind**: global function  
**Returns**: [<code>Document</code>](#Document) - Document needed.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | data array, for read and write. Required. |
| id | <code>\*</code> | Id of document need to find. |

<a name="doCount"></a>

## doCount(data, query) ⇒ <code>number</code>
Count document by query.

**Kind**: global function  
**Returns**: <code>number</code> - Count.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | data array, for read and write. Required. |
| query | <code>object</code> | Match exact query object. |

<a name="doList"></a>

## doList(data, query, controls) ⇒ <code>object</code>
List documents.

**Kind**: global function  
**Returns**: <code>object</code> - List result, contains: total (total of query result), skip (no skip documents), limit (no limit documents), data (list document).  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | data array, for read and write. Required. |
| query | <code>object</code> | Match exact query object. |
| controls | <code>object</code> | Control list result, maybe contains: $limit, $sort, $skip |

<a name="doPatch"></a>

## doPatch(data, query, controls) ⇒ <code>number</code>
Patch documents.

**Kind**: global function  
**Returns**: <code>number</code> - No of changed documents.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | data array, for read and write. Required. |
| query | <code>object</code> | Match exact query object. |
| controls | <code>object</code> | Control list result, maybe contains: $set, $inc. |

<a name="doRemove"></a>

## doRemove(data, query) ⇒ <code>number</code>
Remove documents

**Kind**: global function  
**Returns**: <code>number</code> - No removed document.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | data array, for read and write. Required. |
| query | <code>object</code> | Match exact query object. |

<a name="align"></a>

## align(origin, max, character) ⇒ <code>string</code>
Add prefix to origin text.

**Kind**: global function  
**Returns**: <code>string</code> - Transformed String.  

| Param | Type | Description |
| --- | --- | --- |
| origin | <code>string</code> | Origin string. Required. |
| max | <code>number</code> | Max length of needed string. Required. |
| character | <code>string</code> | Character to add. Required. |

<a name="now"></a>

## now() ⇒ <code>number</code>
Get unique now time.

**Kind**: global function  
**Returns**: <code>number</code> - Now in milisecond.  
<a name="generateId"></a>

## generateId() ⇒ <code>string</code>
Generate unique id.

**Kind**: global function  
**Returns**: <code>string</code> - Id generated  
<a name="Collection"></a>

## Collection : <code>object</code>
Collection structure.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>function</code> | check or get id |
| get | <code>function</code> | Get document by id. |
| count | <code>function</code> | Count no of document returned. |
| list | <code>function</code> | List document by query. |
| create | <code>function</code> | Create a new document. |
| patch | <code>function</code> | Update existed documents. |
| remove | <code>function</code> | Remove documents. |

<a name="Document"></a>

## Document : <code>object</code>
Document structure.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _id | <code>\*</code> | Id of the document. |

<a name="Plugin"></a>

## Plugin : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of plugin. |
| depends | <code>Array.&lt;string&gt;</code> | depend registers, the context should have there before run this plugin. |
| priority | <code>number</code> | same depend have lower priority is run first. |
| start | <code>function</code> | Start function. |
| close | <code>function</code> | Close function. |

