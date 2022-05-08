## Functions

<dl>
<dt><a href="#createApi">createApi(composer)</a> ⇒ <code>function</code></dt>
<dd><p>Create api endpoint.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Composer">Composer</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="createApi"></a>

## createApi(composer) ⇒ <code>function</code>
Create api endpoint.

**Kind**: global function  
**Returns**: <code>function</code> - target function  

| Param | Type | Description |
| --- | --- | --- |
| composer | [<code>Composer</code>](#Composer) | Composer to processing arguments and result. |

<a name="Composer"></a>

## Composer : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| argsParser | <code>function</code> | Argument parser. |
| returnParser | <code>function</code> | Return parser. |

