def calcular_estatisticas(numeros: list) -> tuple:
    """
    Calcula estatísticas de uma lista de números.
    
    Args:
        numeros (list): Lista contendo valores numéricos
    
    Returns:
        tuple: Tupla contendo (total, média, máximo, mínimo)
    
    Raises:
        ValueError: Se a lista estiver vazia
    """
    if not numeros:
        raise ValueError("A lista não pode estar vazia!")
    
    total = sum(numeros)
    media = total / len(numeros)
    maximo = max(numeros)
    minimo = min(numeros)
    
    return total, media, maximo, minimo


def exibir_resultados(total: float, media: float, maximo: float, minimo: float) -> None:
    """
    Exibe os resultados das estatísticas de forma formatada.
    
    Args:
        total (float): Valor total da soma
        media (float): Valor da média aritmética
        maximo (float): Valor máximo da lista
        minimo (float): Valor mínimo da lista
    """
    print(f"Total:  {total}")
    print(f"Média:  {media:.1f}")
    print(f"Maior:  {maximo}")
    print(f"Menor:  {minimo}")


# Dados de entrada
numeros = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]

# Calcular estatísticas
total, media, maximo, minimo = calcular_estatisticas(numeros)

# Exibir resultados
exibir_resultados(total, media, maximo, minimo)