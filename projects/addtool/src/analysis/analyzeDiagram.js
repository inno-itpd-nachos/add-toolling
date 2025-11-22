function analyzeDiagram(parsed) {
    const elements =
      Array.isArray(parsed) && parsed.length > 0 && parsed[0].elements
        ? parsed[0].elements
        : [];
  
    // Компоненты: есть name/title, но нет left/right (то есть это не relation)
    const components = elements.filter(
      (e) => e.name && e.title && !("left" in e) && !("right" in e),
    );
  
    // Связи: есть left и right
    const relations = elements.filter(
      (e) => typeof e.left === "string" && typeof e.right === "string",
    );
  
    const componentNames = components.map((c) => c.name);
  
    const outgoing = new Map();
    const incoming = new Map();
  
    componentNames.forEach((name) => {
      outgoing.set(name, []);
      incoming.set(name, []);
    });
  
    relations.forEach((rel) => {
      const from = rel.left;
      const to = rel.right;
  
      if (!outgoing.has(from)) outgoing.set(from, []);
      if (!incoming.has(to)) incoming.set(to, []);
  
      outgoing.get(from).push(to);
      incoming.get(to).push(from);
    });
  
    const isolatedComponents = componentNames.filter((name) => {
      const out = outgoing.get(name) || [];
      const inc = incoming.get(name) || [];
      return out.length === 0 && inc.length === 0;
    });
  
    // простой поиск циклов
    const visited = new Set();
    const stack = new Set();
    const cycles = [];
  
    function dfs(node, path) {
      if (stack.has(node)) {
        const idx = path.indexOf(node);
        if (idx !== -1) {
          cycles.push(path.slice(idx).concat(node));
        }
        return;
      }
      if (visited.has(node)) return;
  
      visited.add(node);
      stack.add(node);
  
      const neighbors = outgoing.get(node) || [];
      neighbors.forEach((next) => {
        dfs(next, path.concat(next));
      });
  
      stack.delete(node);
    }
  
    componentNames.forEach((name) => {
      if (!visited.has(name)) {
        dfs(name, [name]);
      }
    });
  
    return {
      componentCount: components.length,
      relationCount: relations.length,
      isolatedComponents,
      hasCycles: cycles.length > 0,
      cycles,
    };
  }
  
  module.exports = { analyzeDiagram };
  