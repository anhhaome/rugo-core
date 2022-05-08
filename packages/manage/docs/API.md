## Functions

<dl>
<dt><a href="#autoload">autoload()</a> ⇒ <code><a href="#Pipeline">Pipeline</a></code></dt>
<dd><p>Auto load plugin from current package.json.
Plugins were loaded from dependencies with prefix &#39;rugo&#39;.
If the rugo-* packages does not have rugo-*/plugin file, skipped.</p>
</dd>
<dt><a href="#startPipeline">startPipeline(pipeline, context, stats)</a> ⇒ <code>object</code></dt>
<dd><p>Start a pipeline</p>
</dd>
<dt><a href="#closePipeline">closePipeline(pipeline, context, stats)</a> ⇒ <code>object</code></dt>
<dd><p>Close pipeline.</p>
</dd>
<dt><a href="#createPipeline">createPipeline(pipeline, context, stats)</a> ⇒ <code>object</code></dt>
<dd><p>Create pipeline handle.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Pipeline">Pipeline</a> : <code>Array.&lt;plugin&gt;</code></dt>
<dd></dd>
</dl>

<a name="autoload"></a>

## autoload() ⇒ [<code>Pipeline</code>](#Pipeline)
Auto load plugin from current package.json.
Plugins were loaded from dependencies with prefix 'rugo'.
If the rugo-* packages does not have rugo-\*\/plugin file, skipped.

**Kind**: global function  
**Returns**: [<code>Pipeline</code>](#Pipeline) - pipeline of plugins.  
<a name="startPipeline"></a>

## startPipeline(pipeline, context, stats) ⇒ <code>object</code>
Start a pipeline

**Kind**: global function  
**Returns**: <code>object</code> - Return context.  

| Param | Type | Description |
| --- | --- | --- |
| pipeline | [<code>Pipeline</code>](#Pipeline) | Plugin list. |
| context | <code>object</code> | Sharable object. |
| stats | <code>object</code> | Stats object. |

<a name="closePipeline"></a>

## closePipeline(pipeline, context, stats) ⇒ <code>object</code>
Close pipeline.

**Kind**: global function  
**Returns**: <code>object</code> - Return context.  

| Param | Type | Description |
| --- | --- | --- |
| pipeline | [<code>Pipeline</code>](#Pipeline) | Plugin list. |
| context | <code>object</code> | Sharable object. |
| stats | <code>object</code> | Stats object. |

<a name="createPipeline"></a>

## createPipeline(pipeline, context, stats) ⇒ <code>object</code>
Create pipeline handle.

**Kind**: global function  
**Returns**: <code>object</code> - Return context.  

| Param | Type | Description |
| --- | --- | --- |
| pipeline | [<code>Pipeline</code>](#Pipeline) | Plugin list. |
| context | <code>object</code> | Sharable object. |
| stats | <code>object</code> | Stats object. |

<a name="Pipeline"></a>

## Pipeline : <code>Array.&lt;plugin&gt;</code>
**Kind**: global typedef  
