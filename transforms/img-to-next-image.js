/**
 * Codemod to replace <img> with <Image /> for Next.js
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Add Next.js Image import if missing
  const importDecl = j.importDeclaration(
    [j.importDefaultSpecifier(j.identifier("Image"))],
    j.literal("next/image")
  );
  if (!root.find(j.ImportDeclaration, { source: { value: "next/image" } }).size()) {
    root.get().node.program.body.unshift(importDecl);
  }

  // Replace <img ...> with <Image ... />
  root.findJSXElements("img").forEach(path => {
    path.node.openingElement.name.name = "Image";
    if (path.node.closingElement) {
      path.node.closingElement.name.name = "Image";
    }
  });

  return root.toSource({ quote: "double" });
}


