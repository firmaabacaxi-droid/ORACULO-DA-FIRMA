# Blocos XML para montagem de propostas
*Referência técnica — copiar e adaptar conforme necessário*

## Envelope do documento

Todo document.xml começa e termina com esta estrutura. O conteúdo vai entre `<w:body>` e `<w:sectPr>`.

```xml
<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:sl="http://schemas.openxmlformats.org/schemaLibrary/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture" xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:lc="http://schemas.openxmlformats.org/drawingml/2006/lockedCanvas" xmlns:dgm="http://schemas.openxmlformats.org/drawingml/2006/diagram" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:w16="http://schemas.microsoft.com/office/word/2018/wordml" xmlns:w16cex="http://schemas.microsoft.com/office/word/2018/wordml/cex" xmlns:w16cid="http://schemas.microsoft.com/office/word/2016/wordml/cid" xmlns="http://schemas.microsoft.com/office/tasks/2019/documenttasks" xmlns:cr="http://schemas.microsoft.com/office/comments/2020/reactions">
  <w:body>

    <!-- CONTEÚDO AQUI -->

    <w:sectPr>
      <w:headerReference r:id="rId7" w:type="default"/>
      <w:pgSz w:h="15840" w:w="12240" w:orient="portrait"/>
      <w:pgMar w:bottom="1440" w:top="1440" w:left="1440" w:right="1440" w:header="720" w:footer="720" w:gutter="0"/>
      <w:pgNumType w:start="1"/>
    </w:sectPr>
  </w:body>
</w:document>
```

---

## Bloco: Título do projeto (bold, 14pt)

```xml
<w:p w14:paraId="00000001">
  <w:pPr><w:spacing w:after="120"/><w:jc w:val="both"/><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr></w:pPr>
  <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="28"/><w:szCs w:val="28"/></w:rPr><w:t xml:space="preserve">[TÍTULO DO PROJETO]</w:t></w:r>
</w:p>
```

## Bloco: Subtítulo (italic, 10pt, cinza)

```xml
<w:p w14:paraId="00000002">
  <w:pPr><w:spacing w:after="60"/><w:jc w:val="both"/><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:i/><w:sz w:val="20"/><w:szCs w:val="20"/><w:color w:val="666666"/></w:rPr></w:pPr>
  <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:i/><w:sz w:val="20"/><w:szCs w:val="20"/><w:color w:val="666666"/></w:rPr><w:t xml:space="preserve">Proposta Or&#231;ament&#225;ria</w:t></w:r>
</w:p>
```

## Bloco: Linha dourada separadora

```xml
<w:p w14:paraId="00000003">
  <w:pPr><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="D4AF37"/></w:pBdr><w:spacing w:after="360"/></w:pPr>
</w:p>
```

## Bloco: Saudação (bold, 12pt)

```xml
<w:p w14:paraId="[ID]">
  <w:pPr><w:spacing w:after="200"/><w:jc w:val="both"/><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:pPr>
  <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve">[Prezada/Prezado] [NOME],</w:t></w:r>
</w:p>
```

## Bloco: Parágrafo de corpo (justificado, 12pt)

```xml
<w:p w14:paraId="[ID]">
  <w:pPr><w:spacing w:after="200"/><w:jc w:val="both"/><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:pPr>
  <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve">[TEXTO DO PARÁGRAFO]</w:t></w:r>
</w:p>
```

## Bloco: Título de seção (bold, 12pt)

```xml
<w:p w14:paraId="[ID]">
  <w:pPr><w:spacing w:after="120"/><w:jc w:val="both"/><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:pPr>
  <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve">[TÍTULO DA SEÇÃO]</w:t></w:r>
</w:p>
```

## Bloco: Valor em destaque (texto normal + bold)

```xml
<w:p w14:paraId="[ID]">
  <w:pPr><w:spacing w:after="360"/><w:jc w:val="both"/><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:pPr>
  <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve">[DESCRIÇÃO]: </w:t></w:r>
  <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve">R$ [VALOR]</w:t></w:r>
</w:p>
```

## Bloco: Condição com label dourado

```xml
<w:p w14:paraId="[ID]">
  <w:pPr><w:spacing w:after="60"/><w:jc w:val="both"/><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:pPr>
  <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="24"/><w:szCs w:val="24"/><w:color w:val="D4AF37"/></w:rPr><w:t xml:space="preserve">[LABEL]: </w:t></w:r>
  <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve">[CONTEÚDO]</w:t></w:r>
</w:p>
```

## Bloco: Data centralizada

```xml
<w:p w14:paraId="[ID]">
  <w:pPr><w:spacing w:after="200"/><w:jc w:val="center"/><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:pPr>
  <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:cs="Calibri" w:eastAsia="Calibri" w:hAnsi="Calibri"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve">Bras&#237;lia, [DATA].</w:t></w:r>
</w:p>
```

## Bloco: Assinatura completa (FIXO — sempre igual)

```xml
<w:p w14:paraId="[ID]"><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr></w:p>

<w:p w14:paraId="[ID]">
  <w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr>
  <w:r>
    <w:drawing>
      <wp:anchor allowOverlap="1" behindDoc="1" distB="114300" distT="114300" distL="114300" distR="114300" hidden="0" layoutInCell="1" locked="0" relativeHeight="0" simplePos="0">
        <wp:simplePos x="0" y="0"/>
        <wp:positionH relativeFrom="column"><wp:posOffset>2124075</wp:posOffset></wp:positionH>
        <wp:positionV relativeFrom="paragraph"><wp:posOffset>142875</wp:posOffset></wp:positionV>
        <wp:extent cx="1696045" cy="411467"/>
        <wp:effectExtent b="0" l="0" r="0" t="0"/>
        <wp:wrapNone/>
        <wp:docPr id="1" name="image1.jpg"/>
        <a:graphic>
          <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
            <pic:pic>
              <pic:nvPicPr><pic:cNvPr id="0" name="image1.jpg"/><pic:cNvPicPr preferRelativeResize="0"/></pic:nvPicPr>
              <pic:blipFill><a:blip r:embed="rId6"/><a:srcRect b="0" l="0" r="0" t="0"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>
              <pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="1696045" cy="411467"/></a:xfrm><a:prstGeom prst="rect"/><a:ln/></pic:spPr>
            </pic:pic>
          </a:graphicData>
        </a:graphic>
      </wp:anchor>
    </w:drawing>
  </w:r>
</w:p>

<w:p w14:paraId="[ID]"><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr></w:p>

<w:p w14:paraId="[ID]">
  <w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr>
  <w:r><w:rPr><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr><w:t xml:space="preserve">_____________________________</w:t></w:r>
</w:p>

<w:p w14:paraId="[ID]">
  <w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr></w:pPr>
  <w:r><w:rPr><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr><w:t xml:space="preserve">FILIPE DUQUE</w:t></w:r>
</w:p>

<w:p w14:paraId="[ID]">
  <w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="14"/><w:szCs w:val="14"/></w:rPr></w:pPr>
  <w:r><w:rPr><w:sz w:val="14"/><w:szCs w:val="14"/></w:rPr><w:t xml:space="preserve">CNPJ 50.868.798/0001-66</w:t></w:r>
</w:p>

<w:p w14:paraId="[ID]">
  <w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="16"/><w:szCs w:val="16"/></w:rPr></w:pPr>
  <w:r><w:rPr><w:sz w:val="16"/><w:szCs w:val="16"/></w:rPr><w:t xml:space="preserve">firmaabacaxi@gmail.com</w:t></w:r>
</w:p>

<w:p w14:paraId="[ID]">
  <w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="16"/><w:szCs w:val="16"/></w:rPr></w:pPr>
  <w:r><w:rPr><w:sz w:val="16"/><w:szCs w:val="16"/></w:rPr><w:t xml:space="preserve">+55 61 99618-3146  +55 61 99871-2411</w:t></w:r>
</w:p>
```

---

## Bloco: Tabela de orçamento (para propostas detalhadas)

Usar este bloco quando a proposta tiver uma tabela de itens com valores.

### Estrutura da tabela

A tabela precisa de: header row (com fundo cinza claro) + data rows + footer rows (subtotal, impostos, total).

### Header da tabela

```xml
<w:tbl>
  <w:tblPr>
    <w:tblW w:w="5000" w:type="pct"/>
    <w:tblBorders>
      <w:top w:val="single" w:sz="4" w:space="0" w:color="D4AF37"/>
      <w:bottom w:val="single" w:sz="4" w:space="0" w:color="D4AF37"/>
      <w:insideH w:val="single" w:sz="4" w:space="0" w:color="DDDDDD"/>
    </w:tblBorders>
    <w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/>
  </w:tblPr>
  <w:tblGrid>
    <w:gridCol w:w="4000"/>
    <w:gridCol w:w="2000"/>
    <w:gridCol w:w="1500"/>
    <w:gridCol w:w="2000"/>
  </w:tblGrid>
```

### Linha de cabeçalho (fundo cinza)

```xml
  <w:tr>
    <w:tc>
      <w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="F2F2F2"/></w:tcPr>
      <w:p><w:pPr><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr>
        <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr><w:t>Descri&#231;&#227;o</w:t></w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="F2F2F2"/></w:tcPr>
      <w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr>
        <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr><w:t>Valor Di&#225;ria</w:t></w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="F2F2F2"/></w:tcPr>
      <w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr>
        <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr><w:t>Quantidade</w:t></w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="F2F2F2"/></w:tcPr>
      <w:p><w:pPr><w:jc w:val="right"/><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr>
        <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr><w:t>Total</w:t></w:r>
      </w:p>
    </w:tc>
  </w:tr>
```

### Linha de dados (repetir para cada item)

```xml
  <w:tr>
    <w:tc>
      <w:p><w:pPr><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr>
        <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr><w:t>[DESCRIÇÃO DO ITEM]</w:t></w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr>
        <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr><w:t>R$ [VALOR]</w:t></w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr>
        <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr><w:t>[QTD]</w:t></w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:p><w:pPr><w:jc w:val="right"/><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr>
        <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr><w:t>R$ [TOTAL]</w:t></w:r>
      </w:p>
    </w:tc>
  </w:tr>
```

### Linha de TOTAL (fundo dourado)

```xml
  <w:tr>
    <w:tc>
      <w:tcPr><w:gridSpan w:val="3"/><w:shd w:val="clear" w:color="auto" w:fill="D4AF37"/></w:tcPr>
      <w:p><w:pPr><w:jc w:val="right"/><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr>
        <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr><w:t>TOTAL</w:t></w:r>
      </w:p>
    </w:tc>
    <w:tc>
      <w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="D4AF37"/></w:tcPr>
      <w:p><w:pPr><w:jc w:val="right"/><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:pPr>
        <w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:b/><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr><w:t>R$ [VALOR TOTAL]</w:t></w:r>
      </w:p>
    </w:tc>
  </w:tr>
</w:tbl>
```

---

## IDs dos parágrafos

Cada `w14:paraId` deve ser único no documento. Usar sequência hexadecimal de 8 dígitos começando em `00000001` e incrementando: `00000001`, `00000002`, `00000003`... até o último parágrafo.
