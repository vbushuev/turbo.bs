<select class="form-control" name="{{ $name ?? 'report_id' }}">
    @foreach(Auth::user()->reports as $item)
        <option value="{{ $item->id }}"
        @if( isset($value) && $value== $item->id)
        selected="selected"
        @endif
        >
            {{ $item->name }}
        </option>
    @endforeach
</select>
